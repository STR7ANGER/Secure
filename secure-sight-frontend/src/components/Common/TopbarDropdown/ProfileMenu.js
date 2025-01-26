import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../withRouter";

// users
// import user1 from "../../../assets/images/users/avatar-1.jpg";
import user1 from "../../../assets/images/logo/Images/profile.png";

const ProfileMenu = (props) => {
	// Declare a new state variable, which we'll call "menu"
	const [menu, setMenu] = useState(false);

	const [username, setusername] = useState("Admin");

	useEffect(() => {
		if (localStorage.getItem("authUser")) {
			if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
				const obj = JSON.parse(localStorage.getItem("authUser"));
				setusername(obj.displayName);
			} else if (
				process.env.REACT_APP_DEFAULTAUTH === "fake" ||
				process.env.REACT_APP_DEFAULTAUTH === "jwt"
			) {
				const obj = JSON.parse(localStorage.getItem("authUser"));
				setusername(obj.username);
			}
		}
	}, [props.success]);

	return (
		<React.Fragment>
			<Dropdown
				isOpen={menu}
				toggle={() => setMenu(!menu)}
				className="d-inline-block"
			>
				<DropdownToggle
					className="btn header-item "
					id="page-header-user-dropdown"
					tag="button"
				>
					<div className="d-flex align-items-center">
						<div className="position-relative">
							<img
								className="rounded-circle header-profile-user"
								src={user1}
								alt="Header Avatar"
							/>
							<div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
						</div>
						<div className="ms-3">
							<h6 className="mb-0 color">Admin One</h6>
							<span>Admin</span>
						</div>
						<span className="d-none d-xl-inline-block ms-2 me-2">{username}</span>
						<i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
					</div>
					{/* <span className="d-none d-xl-inline-block ms-2 me-2">{username}</span>
					<i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">
					<Link></Link>
					<Link to="/userprofile" className="dropdown-item">
						<i className="ri-user-line align-middle me-2" />
						<span>{props.t("Profile")}</span>
					</Link>
					{/* <DropdownItem tag="a" href="/userprofile">
            <i className="ri-user-line align-middle me-2" />
            {props.t("Profile")}{" "}
          </DropdownItem> */}
					{/* <DropdownItem tag="a" href="#">
            <i className="ri-wallet-2-line align-middle me-2" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end mt-1">11</span>
            <i className="ri-settings-2-line align-middle me-2" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="ri-lock-unlock-line align-middle me-2" />
            {props.t("Lock screen")}
          </DropdownItem> */}
					<div className="dropdown-divider" />
					<Link to="/logout" className="dropdown-item">
						<i className="ri-shut-down-line align-middle me-2 text-danger" />
						<span>{props.t("Logout")}</span>
					</Link>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

ProfileMenu.propTypes = {
	success: PropTypes.any,
	t: PropTypes.any,
};

const mapStatetoProps = (state) => {
	const { error, success } = state.profile;
	return { error, success };
};

export default withRouter(
	connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
