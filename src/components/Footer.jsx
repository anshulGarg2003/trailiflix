import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="hidden sm:flex text-white sm:justify-between m-5 sm:text-2xl sm:h-[400px] sm:items-center">
        <div className="flex-1">
          <ul>
            <Link>
              <li className="sm:m-10">FAQ</li>
            </Link>
            <li className="sm:m-10">Investor Relations</li>
            <li className="sm:m-10">Privacy</li>
            <li className="sm:m-10">SppedTest</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="sm:m-10">Help Center</li>
            <li className="sm:m-10">Jobs</li>
            <li className="sm:m-10">Cookie Prefrences</li>
            <li className="sm:m-10">Legal Notices</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="sm:m-10">Account</li>
            <li className="sm:m-10">Ways to Watch</li>
            <li className="sm:m-10">Cooperation Info</li>
            <li className="sm:m-10">Only On Netflix</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="sm:m-10">Media Center</li>
            <li className="sm:m-10">Terms Of Use</li>
            <li className="sm:m-10">Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="sm:hidden text-white flex flex-row justify-center w-full pb-3">
        <div className="flex-1 text-right mr-3">
          <ul>
            <Link>
              <li className="sm:m-10">FAQ</li>
            </Link>
            <li className="sm:m-10">Investor Relations</li>
            <li className="sm:m-10">Privacy</li>
            <li className="sm:m-10">SppedTest</li>
            <li className="sm:m-10">Help Center</li>
            <li className="sm:m-10">Jobs</li>
            <li className="sm:m-10">Cookie Prefrences</li>
            <li className="sm:m-10">Legal Notices</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="sm:m-10">Account</li>
            <li className="sm:m-10">Ways to Watch</li>
            <li className="sm:m-10">Cooperation Info</li>
            <li className="sm:m-10">Only On Netflix</li>
            <li className="sm:m-10">Media Center</li>
            <li className="sm:m-10">Terms Of Use</li>
            <li className="sm:m-10">Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-400 w-full justify-center text-center">
        All Right are Reserved for this site{" "}
      </div>
    </>
  );
};

export default Footer;
