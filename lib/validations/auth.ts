/**
 * Authentication Validation Schemas
 * 
 * This module defines Zod validation schemas for authentication forms (login and registration).
 * These schemas ensure that user input meets the required format and constraints before
 * submitting to the authentication service.
 */

import * as z from 'zod';

/**
 * Login form validation schema
 * 
 * Validates email and password fields for the login form:
 * - Email must be provided and in valid email format
 * - Password must be provided and at least 8 characters long
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' }) // Ensure email is not empty
    .email({ message: 'Invalid email address' }), // Validate email format
  password: z
    .string()
    .min(1, { message: 'Password is required' }) // Ensure password is not empty
    .min(8, { message: 'Password must be at least 8 characters' }), // Enforce minimum password length
});

/**
 * Registration form validation schema
 * 
 * Validates all fields for the registration form:
 * - Name must be provided
 * - Email must be provided and in valid email format
 * - Password must be provided and at least 8 characters long
 * - Confirm password must match the password
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' }), // Ensure name is not empty
    email: z
      .string()
      .min(1, { message: 'Email is required' }) // Ensure email is not empty
      .email({ message: 'Invalid email address' }), // Validate email format
    password: z
      .string()
      .min(1, { message: 'Password is required' }) // Ensure password is not empty
      .min(8, { message: 'Password must be at least 8 characters' }), // Enforce minimum password length
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }), // Ensure confirm password is not empty
  })
  // Custom validation to ensure password and confirmPassword match
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Attach the error to the confirmPassword field
  });

// Type definitions derived from the schemas for type safety in forms
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;