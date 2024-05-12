import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="hidden sm:flex text-white sm:justify-center m-5 sm:text-2xl sm:h-[300px] sm:items-center">
        <div className="sm:flex sm:justify-between">
          <div className="flex-1">
            <ul>
              <Link>
                <li className="sm:m-3">FAQ</li>
              </Link>
              <li className="sm:m-3">Investor Relations</li>
              <li className="sm:m-3">Privacy</li>
              <li className="sm:m-3">SppedTest</li>
            </ul>
          </div>
          <div className="flex-1">
            <ul>
              <li className="sm:m-3">Help Center</li>
              <li className="sm:m-3">Jobs</li>
              <li className="sm:m-3">Cookie Prefrences</li>
              <li className="sm:m-3">Legal Notices</li>
            </ul>
          </div>
          <div className="flex-1">
            <ul>
              <li className="sm:m-3">Account</li>
              <li className="sm:m-3">Ways to Watch</li>
              <li className="sm:m-3">Cooperation Info</li>
              <li className="sm:m-3">Only On Netflix</li>
            </ul>
          </div>
          <div className="flex-1">
            <ul>
              <li className="sm:m-3">Media Center</li>
              <li className="sm:m-3">Terms Of Use</li>
              <li className="sm:m-3">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sm:hidden text-white flex flex-row justify-center w-full pb-3">
        <div className="flex-1 text-right mr-3">
          <ul>
            <Link>
              <li className="sm:m-3">FAQ</li>
            </Link>
            <li className="sm:m-3">Investor Relations</li>
            <li className="sm:m-3">Privacy</li>
            <li className="sm:m-3">SppedTest</li>
            <li className="sm:m-3">Help Center</li>
            <li className="sm:m-3">Jobs</li>
            <li className="sm:m-3">Cookie Prefrences</li>
            <li className="sm:m-3">Legal Notices</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="sm:m-3">Account</li>
            <li className="sm:m-3">Ways to Watch</li>
            <li className="sm:m-3">Cooperation Info</li>
            <li className="sm:m-3">Only On Netflix</li>
            <li className="sm:m-3">Media Center</li>
            <li className="sm:m-3">Terms Of Use</li>
            <li className="sm:m-3">Contact Us</li>
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
