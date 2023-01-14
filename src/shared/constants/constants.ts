export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
export const ROLE_ADMIN = 'ROLE_ADMIN';

export enum EAuthority {
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  RESPONSABLE_QUALITE = 'RESPONSABLE_QUALITE',
  RESPONSABLE_PUBLICITE = 'RESPONSABLE_PUBLICITE',
}

// List of all authorities
export const LIST_ALL_AUTHORITIES = [
  EAuthority.ROLE_MODERATOR,
  EAuthority.ROLE_ADMIN,
  EAuthority.ROLE_USER,
  EAuthority.RESPONSABLE_QUALITE,
  EAuthority.RESPONSABLE_PUBLICITE,
];
