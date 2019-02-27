/** @format */

/**
 * Internal dependencies
 */
import {
	EMAIL_FORWARDING_REQUEST,
	EMAIL_FORWARDING_REQUEST_SUCCESS,
	EMAIL_FORWARDING_REQUEST_FAILURE,
	EMAIL_FORWARDING_CREATE_REQUEST,
	EMAIL_FORWARDING_CREATE_REQUEST_SUCCESS,
	EMAIL_FORWARDING_CREATE_REQUEST_FAILURE,
	EMAIL_FORWARDING_REMOVE_REQUEST,
	EMAIL_FORWARDING_REMOVE_REQUEST_SUCCESS,
	EMAIL_FORWARDING_REMOVE_REQUEST_FAILURE,
	EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST,
	EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST_SUCCESS,
	EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST_FAILURE,
} from 'state/action-types';

import 'state/data-layer/wpcom/email-forwarding';

export const requestEmailForwarding = domainName => {
	return {
		type: EMAIL_FORWARDING_REQUEST,
		domainName,
	};
};

export const receiveEmailForwardingRequestSuccess = ( domainName, forwards ) => {
	return {
		type: EMAIL_FORWARDING_REQUEST_SUCCESS,
		domainName,
		forwards,
	};
};

export const receiveEmailForwardingRequestFailure = ( domainName, error ) => {
	return {
		type: EMAIL_FORWARDING_REQUEST_FAILURE,
		domainName,
		error,
	};
};

export const createEmailForwarding = ( domainName, mailbox, destination ) => {
	return {
		type: EMAIL_FORWARDING_CREATE_REQUEST,
		domainName,
		mailbox,
		destination,
	};
};

export const receiveCreateEmailForwardingSuccess = ( domainName, mailbox, verified ) => {
	return {
		type: EMAIL_FORWARDING_CREATE_REQUEST_SUCCESS,
		domainName,
		mailbox,
		verified,
	};
};

export const receiveCreateEmailForwardingFailure = ( domainName, mailbox, destination, error ) => {
	return {
		type: EMAIL_FORWARDING_CREATE_REQUEST_FAILURE,
		domainName,
		mailbox,
		destination,
		error,
	};
};

export const removeEmailForward = ( domainName, mailbox ) => {
	return {
		type: EMAIL_FORWARDING_REMOVE_REQUEST,
		domainName,
		mailbox,
	};
};

export const receiveRemoveEmailForwardingSuccess = ( domainName, mailbox, response ) => {
	return {
		type: EMAIL_FORWARDING_REMOVE_REQUEST_SUCCESS,
		domainName,
		mailbox,
		response,
	};
};

export const receiveRemoveEmailForwardingFailure = ( domainName, mailbox, error ) => {
	return {
		type: EMAIL_FORWARDING_REMOVE_REQUEST_FAILURE,
		domainName,
		mailbox,
		error,
	};
};

export const resendVerificationEmail = ( domainName, mailbox, destination ) => {
	return {
		type: EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST,
		domainName,
		mailbox,
		destination,
	};
};

export const receiveResendVerificationEmailSuccess = (
	domainName,
	mailbox,
	destination,
	response
) => {
	return {
		type: EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST_SUCCESS,
		domainName,
		mailbox,
		destination,
		response,
	};
};

export const receiveResendVerificationEmailFailure = (
	domainName,
	mailbox,
	destination,
	error
) => {
	return {
		type: EMAIL_FORWARDING_RESEND_VERIFICATION_REQUEST_FAILURE,
		domainName,
		mailbox,
		destination,
		error,
	};
};
