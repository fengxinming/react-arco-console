import { Navigate } from "react-router";

export default function Redirect() {
  return <Navigate to="/dashboard/workplace" replace={true} />;
}
