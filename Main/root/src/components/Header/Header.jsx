/** @format */

import React from "react";
import { Modal } from "antd";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import Login from "../Login/Login";
import logo from "../../assets/img/brand/dark.svg";
import { observer } from "mobx-react-lite";
import Store from "../../store";

function Header() {
	const { User } = Store();

	///const name = getToken("name");
	// const handleLogin = () => {
	// 	console.log("aaa");
	// };
	//const [visible, setVisible] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const showModal = () => {
		//setVisible(true);
		User.showLoginFrom();
	};

	// const handleOk = (e) => {
	// 	console.log(e);
	// 	setVisible(false);
	// };

	const handleCancel = (e) => {
		//	console.log(e);
		User.showLoginFrom();
	};
	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();

		if (!targetRect) {
			return;
		}

		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};
	return (
		<>
			<nav className='navbar navbar-expand-lg  bg-white'>
				<div className='container'>
					<span className='navbar-brand'>
						<img id='navbar-logo' src={logo} alt='' />
					</span>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarCollapse'
						aria-controls='navbarCollapse'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					{/* <div className='collapse navbar-collapse' id='navbarCollapse'>
					<ul className='navbar-nav mt-4 mt-lg-0 ml-auto'>
						<li className='nav-item '></li>

						<li className='nav-item '></li>
					</ul>
				</div> */}
					<button
						type='button'
						className='btn btn-sm btn-primary'
						onClick={showModal}
					>
						{User.UserInfo.name ? User.UserInfo.name : "登录/注册"}
					</button>
				</div>
			</nav>
			<Modal
				title={
					<div
						style={{
							width: "100%",
							cursor: "move",
						}}
						onMouseOver={() => {
							if (disabled) {
								setDisabled(false);
							}
						}}
						onMouseOut={() => {
							setDisabled(true);
						}}
						onFocus={() => {}}
						onBlur={() => {}} // end
					>
						登录/注册
					</div>
				}
				destroyOnClose='true'
				visible={User.LoginFrom}
				footer={null}
				// onOk={handleOk}
				onCancel={handleCancel}
				modalRender={(modal) => (
					<Draggable
						disabled={disabled}
						bounds={bounds}
						onStart={(event, uiData) => onStart(event, uiData)}
					>
						<div ref={draggleRef}>{modal}</div>
					</Draggable>
				)}
			>
				<Login></Login>
			</Modal>
		</>
	);
}

export default observer(Header);
