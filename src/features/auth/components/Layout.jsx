import { Head } from "components/Head";
import logo from "assets/logowhite.png";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export const Layout = ({ children, title }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-green-700">
      <Head title={title} />
      <div className="flex flex-col justify-center h-full py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="mt-24"
        >
          <img src={logo} className="h-24 mx-auto" loading="lazy" alt="logo" />
        </button>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-100">
            {title}
          </h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
        <div className="w-5/6 mx-auto my-4">
          <p className="text-center text-gray-200">
            For further support, contact us using our hotline: <span className="font-bold text-white underline">+256-393-112-088</span> or send an email to <span className="font-bold text-white underline">marketing@ncdc.go.ug</span>
          </p>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
