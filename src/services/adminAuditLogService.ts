export interface AdminAuditLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  actionType:
    | 'MANUAL_MEDAL_ASSIGNMENT'
    | 'BULK_RESET_QUOTA'
    | 'SINGLE_RESET_QUOTA'
    | 'TOGGLE_QUALIFICATION'
    | 'TOGGLE_CLOSING_PAYMENT'
    | 'MANUAL_SCORE_EDIT'
    | 'DELETE_PARTICIPANT'
    | 'WHATSAPP_BROADCAST'
    | 'EXPORT_REPORT'
    | 'BATCH_EDIT_PARTICIPANTS'
    | 'IMPORT_QUESTIONS'
    | 'IMPORT_PARTICIPANTS'
    | 'SYNC_DATABASE'
    | 'AUTO_QUALIFY'
    | 'BULK_SCORE_BOOST'
    | 'SETTINGS_UPDATE';
  title: string;
  details: string;
  targetId?: string;
  targetName?: string;
}

const STORAGE_KEY_AUDIT_LOGS = 'osn_admin_audit_logs';

export function getAdminAuditLogs(): AdminAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to get audit logs:', err);
    return [];
  }
}

export function logAdminAction(
  actionType: AdminAuditLogEntry['actionType'],
  title: string,
  details: string,
  targetId?: string,
  targetName?: string,
  adminUser: string = 'admin'
): AdminAuditLogEntry {
  const entry: AdminAuditLogEntry = {
    id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    adminUser,
    actionType,
    title,
    details,
    targetId,
    targetName
  };

  try {
    const logs = getAdminAuditLogs();
    logs.unshift(entry);
    // Keep max 300 logs
    if (logs.length > 300) logs.pop();
    localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(logs));
    window.dispatchEvent(new CustomEvent('osn_audit_log_updated', { detail: entry }));
  } catch (err) {
    console.error('Failed to save audit log:', err);
  }

  return entry;
}

export function clearAdminAuditLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_AUDIT_LOGS);
    window.dispatchEvent(new CustomEvent('osn_audit_log_updated', { detail: null }));
  } catch (err) {
    console.error('Failed to clear audit logs:', err);
  }
}
