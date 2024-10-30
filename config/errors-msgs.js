const ERRORS = {
  INTERNAL_SERVER_ERROR:
    'Erreur interne du serveur. Veuillez réessayer ultérieurement.',
  EMAIL_ALREADY_EXISTS:
    'Cet email existe déjà existe. Veuillez en choisir un autre.',
  AUTHENTICATION_ERROR: 'Email ou mot de passe invalide. Veuillez réessayer.',
  ROLE_DOES_NOT_EXIST: "Le rôle spécifié n'existe pas.",
  UNAUTHORIZED_ACCESS:
    'Accès non autorisé. Veuillez vous connecter pour continuer.',
  RESOURCE_NOT_FOUND: 'Ressource non trouvée.',
  FAILED: 'Échec.',
  NOT_FOUND: 'Non trouvé.',
  UNAUTHORIZED: 'Non autorisé.',
  FORBIDDEN: 'Interdit.',
  PERMISSION_DENIED: 'Permission refusée.',
  RESOURCE_ALREADY_EXISTS: 'La ressource existe déjà.',
  RESOURCE_REMOVED: 'La ressource a été supprimée avec succès.',
  FAILED_TO_SEND_EMAIL: "Échec de l'envoi de l'email.",
  INVALID_OR_EXPIRED_TOKEN: 'Token est invalide ou a expiré.',
  EMAIL_SENT_SUCCESSFULLY: 'Email envoyé avec succès.',
  MAIL_VERIFIED: "L'email est vérifié.",
  INVALID_OR_EXPIRED_OTP: 'Le code OTP est invalide ou a expiré.',
  INVALID_USER_ROLE: 'Rôle utilisateur invalide.',
};

module.exports = ERRORS;
