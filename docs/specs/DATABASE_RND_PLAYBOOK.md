# Database R&D Playbook — The Supercomputer

*April 6, 2026. Grok-designed experiments. The database IS the intelligence layer.*

*"We didn't build a supercomputer with hardware. We built one with relationships."*

---

## Thesis

This isn't a SaaS database. It's a distributed intelligence system that compounds with every participant. Every business that joins makes the AI smarter for every other business. Every show feeds content that feeds discovery that feeds revenue. The computation happens across the data relationships, not in a GPU cluster.

At 1% penetration (1,000 businesses), this database knows more about the Deep South economy than any government dataset.

---

## Experiment 1: Flywheel Velocity

**Hypothesis:** Show bookings accelerate content → directory → revenue within 7 days.

```sql
SELECT e.id, COUNT(a.id) AS articles, COUNT(s.id) AS posts,
       COUNT(d.id) AS impressions, SUM(i.amount) AS revenue
FROM "Event" e
LEFT JOIN "Article" a ON a."eventId" = e.id
LEFT JOIN "SocialPost" s ON s."eventId" = e.id
LEFT JOIN "DirectoryBusiness" d ON d."venueId" = e."venueId"
LEFT JOIN "Invoice" i ON i."tenantId" = e."tenantId"
WHERE e."createdAt" > NOW() - INTERVAL '30 days'
GROUP BY e.id;
```

**Metrics:** days-to-first-article, impressions/show, revenue/show
**Positive result:** >2:1 multiplier confirmed, revenue correlation r > 0.7
**What it proves:** The flywheel isn't a metaphor — it's a measurable economic engine.

---

## Experiment 2: Network Effects

**Hypothesis:** Each added business increases traffic 8-12% to existing ones.

```sql
SELECT COUNT(b.id) AS n, AVG(traffic) AS avg_traffic
FROM "DirectoryBusiness" b
GROUP BY DATE_TRUNC('week', b."createdAt")
ORDER BY n;
```

**Metrics:** traffic delta per new business, critical mass inflection point
**Positive result:** Traffic growth curve turns exponential at ~80 listings per town
**What it proves:** The directory has network effects — it gets more valuable as it grows, not linearly but exponentially.

---

## Experiment 3: Cross-Domain Intelligence

**Hypothesis:** Declining reviews near upcoming shows predict churn.

```sql
SELECT d.name, AVG(r.rating) AS avg_review, COUNT(e.id) AS upcoming_shows
FROM "DirectoryBusiness" d
JOIN "Review" r ON r."businessId" = d.id
JOIN "Event" e ON e."venueId" = d.id
WHERE r."createdAt" > NOW() - INTERVAL '30 days'
GROUP BY d.id
HAVING AVG(r.rating) < 3.5;
```

**Other cross-domain patterns to track:**
- Radio play frequency + DSD business growth in same town
- NPS scores vs show frequency at venues
- Magazine article traffic → directory listing clicks
- Artist radio plays → venue booking requests

**Positive result:** 3+ actionable cross-domain alerts per week
**What it proves:** Intelligence emerges from connecting domains that competitors keep siloed.

---

## Experiment 4: Embedding Space Exploration

**Hypothesis:** Businesses cluster into 5-7 natural neighborhoods by embedding similarity.

```sql
SELECT id, name,
       embedding <-> (SELECT embedding FROM "DirectoryBusiness" WHERE id = $1) AS distance
FROM "DirectoryBusiness"
ORDER BY distance LIMIT 20;
```

**Experiments:**
- Cluster businesses by embedding — do "restaurant row" or "antique district" neighborhoods emerge naturally?
- Embed reviews — find sentiment patterns across the region
- Embed articles — find content gaps (underrepresented topics)
- Embed the flywheel state — represent the entire business as a vector, track movement over time

**Metrics:** cluster cohesion (intra-cluster distance), content-gap fill rate
**Positive result:** Clear neighborhoods emerge + 20% content-gap identification
**What it proves:** The embedding space IS a map of the regional economy. We can see it.

---

## Experiment 5: Predictive Business Health

**Hypothesis:** Review velocity + posting cadence predict churn at 30 days.

```sql
SELECT b.id, COUNT(r.id) AS review_velocity, COUNT(s.id) AS posts_30d,
       AVG(m.value) AS engagement
FROM "DirectoryBusiness" b
LEFT JOIN "Review" r ON r."businessId" = b.id
LEFT JOIN "SocialPost" s ON s."businessId" = b.id
LEFT JOIN "Metric" m ON m."businessId" = b.id
GROUP BY b.id;
```

**Prediction targets:**
- Churn 30 days before it happens (75%+ accuracy target)
- Free → paid conversion probability
- $25 → $99 upgrade probability
- Business health score (0-100) from available signals

**Signals available:** review velocity, social engagement, posting cadence, Sovereign Pi heartbeat, campaign completion, time-on-platform

**Positive result:** 75%+ AUC on churn prediction, health score correlates with real business outcomes
**What it proves:** The database can predict business futures — that's supplemental underwriting data for banks.

---

## Experiment 6: The Supercomputer Argument

**The case:**

| Traditional Supercomputer | HDI Database Supercomputer |
|---|---|
| Computation via GPU clusters | Computation via data relationships |
| Value from FLOPS | Value from connections between entities |
| Static architecture | Self-reinforcing flywheel architecture |
| Expensive to scale | Gets cheaper per insight as it grows |
| Serves one purpose | 12 domains of distributed intelligence |
| Knowledge expires | Knowledge compounds |

**At scale:**
- 12 domains = distributed computation across every aspect of a regional economy
- Each new data point improves predictions across ALL domains
- The embedding space = a shared mathematical representation of an entire regional economy
- The flywheel = a self-reinforcing computation loop where outputs become inputs
- At 1% penetration (1,000 businesses), more economic intelligence about the Deep South than Census, BLS, or any government dataset

**The line:** "Every tech company in Silicon Valley is buying GPUs to build intelligence. We built ours with a $167/month database and 1,425 businesses on Main Street."

---

## Implementation

All experiments run inside the existing NL2SQL tool (`query_database`). Results tracked in the Analytics domain (Report, Metric, MetricSnapshot models).

**Phase 1 (now):** Run experiments manually via direct SQL on Neon
**Phase 2 (Phase 1 tools built):** Run via Delta Dawn's query_database tool
**Phase 3 (data accumulates):** Automate as cron jobs, surface in HQ dashboard

**Key dependency:** Need real DSD customers generating real data. Dogfood phase (4 internal clients) provides initial dataset. External sales expand it.

---

*This playbook turns our database from a record store into a research lab. Every query is an experiment. Every insight compounds.*
