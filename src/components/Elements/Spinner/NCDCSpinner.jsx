import logo from "assets/logo.png";

export const NCDCSpinner = () => {
  return (
    <>
      <img src={logo} alt="logo" className="w-20 h-20" />
      <span className="sr-only">Loading</span>
    </>
  );
};
