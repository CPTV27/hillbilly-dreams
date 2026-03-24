/**
 * Gmail Auto-Filter Setup for Chase Pierson
 *
 * HOW TO USE:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this entire file
 * 4. Click Run → setupAllFilters
 * 5. Authorize when prompted
 * 6. Done — all filters are live
 */

function setupAllFilters() {
  // ============================================
  // GROUP 1: AUTO-ARCHIVE (Skip Inbox)
  // These get labeled but never bother you
  // ============================================

  // Newsletters & Marketing blasts
  createFilter(
    'from:(noreply@* OR newsletter@* OR marketing@* OR digest@* OR updates@*)',
    { archive: true, label: 'SuperChase/Newsletter' }
  );

  // GitHub notifications
  createFilter(
    'from:notifications@github.com',
    { archive: true, label: 'Clients/GitHub' }
  );

  // Asana notifications
  createFilter(
    'from:(notification@asana.com OR asana@asana.com)',
    { archive: true, label: 'Clients/Asana' }
  );

  // LinkedIn noise
  createFilter(
    'from:(*@linkedin.com) -from:(inmails)',
    { archive: true, label: 'Clients/LinkedIn' }
  );

  // Automated receipts & invoices (archive, keep for records)
  createFilter(
    'subject:(receipt OR "payment confirmed" OR "order confirmation" OR "your invoice") from:(noreply@* OR no-reply@* OR receipts@*)',
    { archive: true, label: 'ChaseOS/Cold' }
  );

  // Google Workspace admin alerts (archive, label)
  createFilter(
    'from:(workspace-noreply@google.com OR no-reply@accounts.google.com)',
    { archive: true, label: 'Clients/Google Workspace' }
  );

  // Vercel / Netlify deploy notifications
  createFilter(
    'from:(notifications@vercel.com OR team@netlify.com)',
    { archive: true, label: 'Clients/Vercel' }
  );

  // ============================================
  // GROUP 2: AUTO-STAR (Important — hits inbox starred)
  // These float to the top
  // ============================================

  // Hillbilly Dreams corporate emails
  createFilter(
    'to:(chase@hillbillydreamsinc.com OR legal@hillbillydreamsinc.com OR billing@hillbillydreamsinc.com OR info@hillbillydreamsinc.com)',
    { star: true, label: 'Priority/High' }
  );

  // S2PX / Scan2Plan business
  createFilter(
    'to:chase@scan2plan.io',
    { star: true, label: 'Clients/Scan2Plan' }
  );

  // Big Muddy operations
  createFilter(
    'from:(*@bigmuddytouring.com OR *@thebigmuddyinn.com OR *@bigmuddymedia.com)',
    { star: true, label: 'Clients/Big Muddy Inn' }
  );

  // Booking platform notifications (Airbnb, VRBO, etc)
  createFilter(
    'from:(*@airbnb.com OR *@vrbo.com OR *@booking.com OR *@guesty.com)',
    { star: true, label: 'ChaseOS/Hot' }
  );

  // Google Cloud alerts (billing, quotas, incidents)
  createFilter(
    'from:(billing-noreply@google.com OR cloud-noreply@google.com)',
    { star: true, label: 'Clients/Google Cloud' }
  );

  // Stripe payment notifications
  createFilter(
    'from:(*@stripe.com) subject:(payment OR payout OR dispute)',
    { star: true, label: 'Priority/High' }
  );

  // ============================================
  // GROUP 3: PURE SPAM KILL (Auto-delete)
  // Never see these again
  // ============================================

  createFilter(
    'subject:("limited time offer" OR "act now" OR "exclusive deal" OR "you have been selected" OR "congratulations you won")',
    { trash: true }
  );

  Logger.log('✅ All filters created successfully!');
}

/**
 * Helper: Create a Gmail filter
 */
function createFilter(query, actions) {
  var me = Session.getActiveUser().getEmail();

  var filter = {
    criteria: { query: query },
    action: {}
  };

  if (actions.archive) {
    filter.action.removeLabelIds = ['INBOX'];
  }

  if (actions.star) {
    filter.action.addLabelIds = filter.action.addLabelIds || [];
    filter.action.addLabelIds.push('STARRED');
  }

  if (actions.trash) {
    filter.action.addLabelIds = filter.action.addLabelIds || [];
    filter.action.addLabelIds.push('TRASH');
  }

  if (actions.label) {
    // Find or create the label
    var labelId = getOrCreateLabel(actions.label);
    filter.action.addLabelIds = filter.action.addLabelIds || [];
    filter.action.addLabelIds.push(labelId);
  }

  try {
    Gmail.Users.Settings.Filters.create(filter, 'me');
    Logger.log('✅ Filter created: ' + query.substring(0, 50) + '...');
  } catch (e) {
    Logger.log('⚠️ Filter may already exist or error: ' + e.message);
  }
}

/**
 * Helper: Get label ID by name, create if doesn't exist
 */
function getOrCreateLabel(labelName) {
  var labels = Gmail.Users.Labels.list('me').labels;

  for (var i = 0; i < labels.length; i++) {
    if (labels[i].name === labelName) {
      return labels[i].id;
    }
  }

  // Create the label if it doesn't exist
  var newLabel = Gmail.Users.Labels.create({
    name: labelName,
    labelListVisibility: 'labelShow',
    messageListVisibility: 'show'
  }, 'me');

  Logger.log('Created new label: ' + labelName);
  return newLabel.id;
}
