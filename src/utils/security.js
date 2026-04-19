/**
 * Security utilities for AadhiGuru
 */

import DOMPurify from 'dompurify';

/**
 * Sanitizes an input string to prevent XSS attacks.
 * @param {string} dirty 
 * @returns {string}
 */
export const sanitize = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML allowed for most inputs
    ALLOWED_ATTR: []
  });
};

/**
 * Validates a 10-digit Indian phone number.
 * @param {string} phone 
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

/**
 * Validates email format.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Security logger (can be connected to an external service like Sentry)
 * @param {string} event 
 * @param {object} details 
 */
export const securityLog = (event, details) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to a monitoring service
    // console.log(`[SECURITY] ${event}`, details);
  } else {
    console.warn(`[SECURITY-DEV] ${event}`, details);
  }
};
