import React from "react";
import PropTypes from "prop-types"; 
import { connect }from "react-redux";

import ConfirmEmailMessage from "../message/ConfirmEmailMessage"

const DashboardPage = ({ isConfirmed }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage  />}

    </div>
);

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProp(state){
    return {
        isConfirmed: state.user.confired
    }
}

export default connect(mapStateToProp)(DashboardPage);
