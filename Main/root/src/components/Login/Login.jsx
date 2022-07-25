/** @format */

import React from "react";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useState } from "react";
import Store from "../../store";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";

function Login() {
	const { User } = Store();
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	//const [loading] = useState(User.Loading);

	const getUser = (e) => {
		//console.log(e.target.value);
		setUser((user) => e.target.value);
	};
	const setKey = (e) => {
		//console.log(e.target.value);
		setPass((pass) => e.target.value);
	};
	const handleLogin = () => {
		//console.log(user, key);
		const data = { user, pass };
		User.handleLogin(data);
	};
	return (
		<Spin spinning={User.Loading}>
			<section>
				<div className='card shadow zindex-100 mb-0'>
					<div className='card-body px-md-5 py-5'>
						<span className='clearfix'></span>
						<form>
							<div className='form-group'>
								<label className='form-control-label'>账号：</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i data-feather='user'>
												<UserOutlined />
											</i>
										</span>
									</div>
									<input
										type='email'
										className='form-control'
										id='input-email'
										placeholder=''
										onChange={getUser}
									/>
								</div>
							</div>
							<div className='form-group mb-0'>
								<div className='d-flex align-items-center justify-content-between'>
									<div>
										<label className='form-control-label'>密码：</label>
									</div>
								</div>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i data-feather='key'>
												<KeyOutlined />
											</i>
										</span>
									</div>
									<input
										type='password'
										className='form-control'
										id='input-password'
										placeholder=''
										onChange={setKey}
									/>
								</div>
							</div>
							<div className='mt-4'>
								<button
									type='button'
									className='btn btn-block btn-primary'
									onClick={handleLogin}
								>
									登录
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</Spin>
	);
}

export default observer(Login);
