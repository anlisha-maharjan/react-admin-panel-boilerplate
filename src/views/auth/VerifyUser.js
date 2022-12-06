import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "reduxs/actions";
import { LayoutSplashScreen } from "configs/LayoutSplashScreen";

const VerifyUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { tokenLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!tokenLoading) dispatch(verifyUser(params?.token, navigate));
  }, []);

  return <LayoutSplashScreen />;
};

export default VerifyUser;
