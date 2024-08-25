import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError();

  return <div className="container-fluid bg-dark">
    {
        <h2 className="text-white text-center py-4">
            {error.message}
        </h2>
    }
  </div>;
}
