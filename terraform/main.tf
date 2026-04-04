terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "hillbilly-dreams-sovereign"
}

variable "region" {
  description = "The GCP region for the Assured Workloads Boundary"
  type        = string
  default     = "us-central1"
}

// ─────────────────────────────────────────────────────────────
// The Ledger: Cloud SQL for PostgreSQL
// ─────────────────────────────────────────────────────────────
resource "google_sql_database_instance" "sovereign_db" {
  name             = "sovereign-db-primary"
  region           = var.region
  database_version = "POSTGRES_16"
  
  settings {
    tier = "db-custom-2-8192" # 2 vCPU, 8GB RAM

    ip_configuration {
      ipv4_enabled = true
      // Configured for Auth Proxy
    }

    # Enables pgvector inherently by allowing extensions on the db.
    database_flags {
      name  = "cloudsql.enable_pgvector"
      value = "on"
    }
  }
  
  deletion_protection = true
}

resource "google_sql_database" "database" {
  name     = "hillbilly_sovereign"
  instance = google_sql_database_instance.sovereign_db.name
}

// ─────────────────────────────────────────────────────────────
// The Media Rail: Google Cloud Storage (GCS)
// ─────────────────────────────────────────────────────────────
resource "google_storage_bucket" "lore_vault" {
  name          = "sovereign-lore-vault-${var.project_id}"
  location      = "US" # Enforces US multi-region / data boundary
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

// ─────────────────────────────────────────────────────────────
// Secret Manager: Environment Secrets
// ─────────────────────────────────────────────────────────────
resource "google_secret_manager_secret" "database_url" {
  secret_id = "DATABASE_URL"
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "database_url_val" {
  secret      = google_secret_manager_secret.database_url.id
  secret_data = "postgresql://USER:PASSWORD@/hillbilly_sovereign?host=/cloudsql/${google_sql_database_instance.sovereign_db.connection_name}"
}

// ─────────────────────────────────────────────────────────────
// The Hub: Cloud Run
// ─────────────────────────────────────────────────────────────
resource "google_cloud_run_v2_service" "sovereign_hub" {
  name     = "sovereign-hub"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    execution_environment = "EXECUTION_ENVIRONMENT_GEN2"

    containers {
      image = "us-central1-docker.pkg.dev/${var.project_id}/sovereign/hub:latest"
      
      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.database_url.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      
      # WebSockets Config
      ports {
        container_port = 3000
      }
    }

    scaling {
      min_instance_count = 1  # Required for Socket.io session longevity
      max_instance_count = 10
    }
  }

  // Socket.io Session Affinity
  # BETA feature requirement for standard session affinity
  labels = {
    "run.googleapis.com/sessionAffinity" = "true"
  }
}

output "cloud_run_url" {
  value = google_cloud_run_v2_service.sovereign_hub.uri
}

output "db_connection_name" {
  value = google_sql_database_instance.sovereign_db.connection_name
}
