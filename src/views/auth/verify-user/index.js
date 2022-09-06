import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "src/reduxs/actions";
import { LayoutSplashScreen } from "src/configs/splash-screen";

const VerifyUser = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    props.verifyUser(params.token, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LayoutSplashScreen />;
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {
  verifyUser,
})(VerifyUser);
