export interface Song {
  id: string;
  title: string;
  artist: string;
  url?: string;
  duration?: number; // duration in seconds
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  playlists: Playlist[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchResult<T> {
  results: T[];
  total: number;
}

export interface ErrorResponse {
  message: string;
  code?: number;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreatePlaylistPayload {
  name: string;
}

export interface AddSongToPlaylistPayload {
  playlistId: string;
  song: Song;
}

export interface RemoveSongFromPlaylistPayload {
  playlistId: string;
  songId: string;
}

export interface UpdatePlaylistPayload {
  playlistId: string;
  name?: string;
  songs?: Song[];
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  token: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  data: Buffer;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface CreateNotificationPayload {
  message: string;
}

export interface MarkNotificationAsReadPayload {
  notificationId: string;
}

export interface DeleteNotificationPayload {
  notificationId: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;}
export interface UpdateSettingsPayload {
  theme?: 'light' | 'dark';
  notificationsEnabled?: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
}

export interface CreateActivityLogPayload {
  userId: string;
  action: string;
}

export interface SystemStats {
  totalUsers: number;
  totalPlaylists: number;
  totalSongs: number;
}

export interface SearchQuery {
  query: string;
  filters?: Record<string, any>;
  pagination?: Pagination;
}

export interface SearchPayload<T> {
  query: SearchQuery;
  results: SearchResult<T>;
}

export interface BulkOperationResult {
  successCount: number;
  failureCount: number;
  errors: string[];
}

export interface BulkCreateSongsPayload {
  songs: Song[];
}

export interface BulkDeleteSongsPayload {
  songIds: string[];
}

export interface BulkUpdateSongsPayload {
  songs: Song[];
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface UpdateNotificationSettingsPayload {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface UserProfile {
  user: User;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: SocialLink[];
}

export interface UpdateUserProfilePayload {
  bio?: string;
  avatarUrl?: string;
  socialLinks?: SocialLink[];
}

export interface FollowUserPayload {
  userIdToFollow: string;
}

export interface UnfollowUserPayload {
  userIdToUnfollow: string;
}

export interface Follower {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface Following {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface FollowersList {
  followers: Follower[];
  following: Following[];
}

export interface ReportContentPayload {
  contentId: string;
  contentType: 'song' | 'playlist' | 'user';
  reason: string;
  details?: string;
}

export interface ReportResponse {
  reportId: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface ContentFlag {
  id: string;
  contentId: string;
  contentType: 'song' | 'playlist' | 'user';
  reason: string;
  reportedBy: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

export interface ModerationActionPayload {
  flagId: string;
  action: 'approve' | 'reject' | 'delete';
  moderatorId: string;
  notes?: string;
}

export interface ModerationActionResponse {
  success: boolean;
  message: string;
}

export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface AvailableThemesResponse {
  themes: Theme[];
}

export interface ApplyThemePayload {
  themeName: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

export interface Leaderboard {
  entries: LeaderboardEntry[];
  totalEntries: number;
  generatedAt: Date;
}

export interface GenerateLeaderboardPayload {
  criteria: 'most_played' | 'most_followers' | 'most_playlists';
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'all_time';
}

export interface TwoFactorAuthSetup {
  secret: string;
  qrCodeUrl: string;
}

export interface EnableTwoFactorAuthPayload {
  token: string;
}

export interface DisableTwoFactorAuthPayload {
  token: string;
}

export interface TwoFactorAuthStatus {
  enabled: boolean;
  method?: 'authenticator_app' | 'sms' | 'email';
}

export interface VerifyTwoFactorAuthPayload {
  token: string;
}

export interface PasswordResetRequestPayload {
  email: string;
}

export interface PasswordResetPayload {
  resetToken: string;
  newPassword: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

export interface EmailVerificationPayload {
  verificationToken: string;
}

export interface ResendEmailVerificationPayload {
  email: string;
}

export interface EmailVerificationStatus {
  verified: boolean;
  email: string;
}

export interface ApiRateLimit {
  maxRequests: number;
  windowMs: number; // in milliseconds
}

export interface RateLimitStatus {
  remainingRequests: number;
  resetTime: Date;
}

export interface SetApiRateLimitPayload {
  maxRequests: number;
  windowMs: number; // in milliseconds
}

export interface ApiUsageLog {
  id: string;
  userId: string;
  endpoint: string;
  method: string;
  timestamp: Date;
  statusCode: number;
}

export interface ApiUsageLogsResponse {
  logs: ApiUsageLog[];
  totalLogs: number;
  page: number;
  limit: number;
}

export interface FetchApiUsageLogsPayload {
  userId?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  dateRange?: { from: Date; to: Date };
  pagination?: Pagination;
}

export interface SystemHealth {
  uptime: number; // in seconds
  databaseConnected: boolean;
  activeUsers: number;
  totalRequests: number;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  details: SystemHealth;
}

export interface MaintenanceModePayload {
  enable: boolean;
  message?: string;
}

export interface MaintenanceStatus {
  enabled: boolean;
  message?: string;
  since?: Date;
}

export interface Backup {
  id: string;
  createdAt: Date;
  size: number; // in bytes
  url: string;
}

export interface CreateBackupResponse {
  backup: Backup;
}

export interface RestoreBackupPayload {
  backupId: string;
}

export interface DeleteBackupPayload {
  backupId: string;
}

export interface ListBackupsResponse {
  backups: Backup[];
}

export interface StorageUsage {
  totalStorage: number; // in bytes
  usedStorage: number; // in bytes
  freeStorage: number; // in bytes
}

export interface StorageUsageResponse {
  usage: StorageUsage;
}

export interface StorageSettings {
  maxStoragePerUser: number; // in bytes
  allowedFileTypes: string[];
}

export interface UpdateStorageSettingsPayload {
  maxStoragePerUser?: number; // in bytes
  allowedFileTypes?: string[];
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationTemplatePayload {
  name: string;
  subject: string;
  body: string;
}

export interface UpdateNotificationTemplatePayload {
  templateId: string;
  name?: string;
  subject?: string;
  body?: string;
}

export interface DeleteNotificationTemplatePayload {
  templateId: string;
}

export interface ListNotificationTemplatesResponse {
  templates: NotificationTemplate[];
}

export interface SendNotificationPayload {
  userId: string;
  templateId: string;
  variables?: Record<string, string>;
}

export interface SendNotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  timestamp: Date;
}

export interface AuditLogsResponse {
  logs: AuditLog[];
  totalLogs: number;
  page: number;
  limit: number;
}

export interface FetchAuditLogsPayload {
  userId?: string;
  action?: string;
  dateRange?: { from: Date; to: Date };
  pagination?: Pagination;
}

export interface SystemConfig {
  siteName: string;
  siteUrl: string;
  supportEmail: string;
  defaultLanguage: string;
  maintenanceMode: boolean;
}

export interface UpdateSystemConfigPayload {
  siteName?: string;
  siteUrl?: string;
  supportEmail?: string;
  defaultLanguage?: string;
  maintenanceMode?: boolean;
}

export interface FetchSystemConfigResponse {
  config: SystemConfig;
}

export interface ApiKey {
  id: string;
  userId: string;
  key: string;
  createdAt: Date;
  expiresAt?: Date;
  permissions: string[];
}

export interface CreateApiKeyPayload {
  userId: string;
  expiresAt?: Date;
  permissions: string[];
}

export interface RevokeApiKeyPayload {
  apiKeyId: string;
}

export interface ListApiKeysResponse {
  apiKeys: ApiKey[];
}

export interface ValidateApiKeyResponse {
  valid: boolean;
  apiKey?: ApiKey;
}

export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWebhookPayload {
  url: string;
  event: string;
}

export interface UpdateWebhookPayload {
  webhookId: string;
  url?: string;
  event?: string;
}

export interface DeleteWebhookPayload {
  webhookId: string;
}

export interface ListWebhooksResponse {
  webhooks: Webhook[];
}

export interface TriggerWebhookPayload {
  event: string;
  data: Record<string, any>;
}

export interface TriggerWebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}
