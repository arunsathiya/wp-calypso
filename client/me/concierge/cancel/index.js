/** @format */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import QuerySites from 'components/data/query-sites';
import QueryConciergeInitial from 'components/data/query-concierge-initial';
import QueryConciergeAppointmentDetails from 'components/data/query-concierge-appointment-details';
import Button from 'components/button';
import Main from 'components/main';
import { localize } from 'i18n-calypso';
import Confirmation from '../shared/confirmation';
import { cancelConciergeAppointment } from 'state/concierge/actions';
import { CONCIERGE_STATUS_CANCELLED, CONCIERGE_STATUS_CANCELLING } from '../constants';
import { getSite } from 'state/sites/selectors';
import getConciergeAppointmentDetails from 'state/selectors/get-concierge-appointment-details';
import getConciergeScheduleId from 'state/selectors/get-concierge-schedule-id';
import getConciergeSignupForm from 'state/selectors/get-concierge-signup-form';
import { recordTracksEvent } from 'state/analytics/actions';
import PageViewTracker from 'lib/analytics/page-view-tracker';

class ConciergeCancel extends Component {
	static propTypes = {
		analyticsPath: PropTypes.string,
		analyticsTitle: PropTypes.string,
		appointmentId: PropTypes.string.isRequired,
		siteSlug: PropTypes.string.isRequired,
		scheduleId: PropTypes.number,
	};

	componentDidMount() {
		this.props.recordTracksEvent( 'calypso_concierge_cancel_step' );
	}
	cancelAppointment = () => {
		const { appointmentId, scheduleId } = this.props;
		this.props.cancelConciergeAppointment( scheduleId, appointmentId );
	};

	getDisplayComponent = () => {
		const {
			appointmentId,
			appointmentDetails,
			scheduleId,
			siteSlug,
			signupForm,
			translate,
		} = this.props;

		switch ( signupForm.status ) {
			case CONCIERGE_STATUS_CANCELLED:
				return (
					<Confirmation
						description={ translate( 'Would you like to schedule a new session?' ) }
						title={ translate( 'Your session has been cancelled.' ) }
					>
						<Button
							className="cancel__schedule-button"
							href={ `/me/concierge/${ siteSlug }/book` }
							primary={ true }
						>
							{ translate( 'Schedule', {
								context: 'Concierge session',
							} ) }
						</Button>
					</Confirmation>
				);

			default:
				const disabledCancelling =
					includes(
						[ CONCIERGE_STATUS_CANCELLED, CONCIERGE_STATUS_CANCELLING ],
						signupForm.status
					) ||
					! appointmentDetails ||
					! scheduleId;

				const disabledRescheduling =
					signupForm.status === CONCIERGE_STATUS_CANCELLING || ! appointmentDetails || ! scheduleId;

				return (
					<div>
						{ scheduleId && (
							<QueryConciergeAppointmentDetails
								appointmentId={ appointmentId }
								scheduleId={ scheduleId }
							/>
						) }

						<Confirmation
							description={ translate(
								'You can also reschedule your session. What would you like to do?'
							) }
							title={ translate( 'Cancel your session' ) }
						>
							<Button
								className="cancel__reschedule-button"
								disabled={ disabledRescheduling }
								href={ `/me/concierge/${ siteSlug }/${ appointmentId }/reschedule` }
							>
								{ translate( 'Reschedule session' ) }
							</Button>

							<Button
								className="cancel__confirmation-button"
								disabled={ disabledCancelling }
								onClick={ this.cancelAppointment }
								primary={ true }
								scary={ true }
							>
								{ translate( 'Cancel session' ) }
							</Button>
						</Confirmation>
					</div>
				);
		}
	};

	render() {
		const { analyticsPath, analyticsTitle, site } = this.props;
		const siteId = site && site.ID;

		return (
			<Main>
				<QuerySites />
				{ siteId && <QueryConciergeInitial siteId={ siteId } /> }
				<PageViewTracker path={ analyticsPath } title={ analyticsTitle } />
				{ this.getDisplayComponent() }
			</Main>
		);
	}
}

export default connect(
	( state, props ) => ( {
		appointmentDetails: getConciergeAppointmentDetails( state, props.appointmentId ),
		signupForm: getConciergeSignupForm( state ),
		site: getSite( state, props.siteSlug ),
		scheduleId: getConciergeScheduleId( state ),
	} ),
	{ cancelConciergeAppointment, recordTracksEvent }
)( localize( ConciergeCancel ) );
