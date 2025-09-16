export interface AuthComponent {
  id: string;
  type: AuthComponentType;
  name: string;
  description: string;
  icon: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: Connection[];
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  condition?: string;
  label?: string;
}

export interface AuthFlow {
  id: string;
  name: string;
  description: string;
  components: AuthComponent[];
  connections: Connection[];
  startComponentId: string;
  isFragment: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum AuthComponentType {
  LOGIN_FORM = 'login-form',
  REGISTER_FORM = 'register-form',
  SOCIAL_AUTH = 'social-auth',
  MFA = 'mfa',
  EMAIL_VERIFICATION = 'email-verification',
  PASSWORD_RESET = 'password-reset',
  CONDITIONAL = 'conditional',
  CUSTOM_SCRIPT = 'custom-script',
  REDIRECT = 'redirect',
  FRAGMENT = 'fragment'
}

export interface ComponentTemplate {
  type: AuthComponentType;
  name: string;
  description: string;
  icon: string;
  defaultConfig: Record<string, any>;
}