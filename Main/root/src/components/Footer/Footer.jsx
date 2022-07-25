/** @format */

import React from "react";
import logo from "../../assets/img/brand/light.svg";

export default function Footer() {
	return (
		<footer className='position-relative' id='footer-main'>
			<div className='footer pt-lg-7 footer-dark bg-dark'>
				<div className='shape-container shape-line shape-position-top shape-orientation-inverse'>
					{/* <svg
						width='2560px'
						height='100px'
						preserveAspectRatio='none'
						x='0px'
						y='0px'
						viewBox='0 0 2560 100'
						style={{ enableBackground: "new 0 0 2560 100" }}
						className=' fill-section-secondary'
					>
						<polygon points='2560 0 2560 100 0 100'></polygon>
					</svg> */}
				</div>

				<div className='container pt-4'>
					<div className='row'>
						<div className='col-lg-4 mb-5 mb-lg-0'>
							<a href='index.html'>
								<img alt='' src={logo} id='footer-logo' />
							</a>
							<p className='mt-4 text-sm opacity-8 pr-lg-4'>相关技术</p>
						</div>
						<div className='col-lg-2 col-6 col-sm-4 ml-lg-auto mb-5 mb-lg-0'>
							<h6 className='heading mb-3'>前端</h6>
							<ul className='list-unstyled'>
								<li>
									<span>React</span>
								</li>
								<li>
									<span>Vue</span>
								</li>
								<li>
									<span>Uni-app</span>
								</li>
								<li>
									<span>JavaScript</span>
								</li>
							</ul>
						</div>
						<div className='col-lg-2 col-6 col-sm-4 mb-5 mb-lg-0'>
							<h6 className='heading mb-3'>后端</h6>
							<ul className='list-unstyled'>
								<li>
									<span>Go</span>
								</li>
								<li>
									<span>Node</span>
								</li>
								<li>
									<span>Mysql</span>
								</li>
								<li>
									<span>Redis</span>
								</li>
							</ul>
						</div>
						<div className='col-lg-2 col-6 col-sm-4 mb-5 mb-lg-0'>
							<h6 className='heading mb-3'>UI</h6>
							<ul className='list-unstyled'>
								<li>
									<span>Ant Design</span>
								</li>
								<li>
									<span>Element-ui</span>
								</li>
								<li>
									<span>Vant</span>
								</li>
							</ul>
						</div>
					</div>
					<hr className='divider divider-fade divider-dark my-4' />
					<div className='row align-items-center justify-content-md-between pb-4'>
						<div className='col-md-6'>
							<div className='copyright text-sm font-weight-bold text-center text-md-left'>
								&copy; 2020{" "}
								<a
									href='https://webpixels.io'
									className='font-weight-bold'
									target='_blank'
									rel='noreferrer'
								>
									Webpixels
								</a>
								. All rights reserved
							</div>
						</div>
						<div className='col-md-6'>
							<ul className='nav justify-content-center justify-content-md-end mt-3 mt-md-0'>
								<li className='nav-item'>
									<span className='nav-link'>Terms</span>
								</li>
								<li className='nav-item'>
									<span className='nav-link'>Privacy</span>
								</li>
								<li className='nav-item'>
									<span className='nav-link'>Cookies</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
