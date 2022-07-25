/** @format */

import React from "react";
import bg from "../../assets/img/svg/illustrations/illustration-3.svg";

export default function Banner() {
	return (
		<section className='slice py-7'>
			<div className='container'>
				<div className='row row-grid align-items-center'>
					<div className='col-12 col-md-5 col-lg-6 order-md-2 text-center'>
						<figure className='w-100'>
							{/* <img src='../' className='img-fluid mw-md-120'/> */}
							<img src={bg} alt='' className='img-fluid mw-md-120' />
						</figure>
					</div>
					<div className='col-12 col-md-7 col-lg-6 order-md-1 pr-md-5'>
						<h1 className='display-4 text-center text-md-left mb-3'>
							一个web应用
							<br />
							<strong className='text-primary'>A Web application</strong>
						</h1>
						<p className='lead text-center text-md-left text-muted'>
							本站点应用 "qiankun" 编写......
						</p>
						<div className='text-center text-md-left mt-5'>
							<span
								href=''
								className='btn btn-primary btn-icon'
								target='_blank'
							>
								<span className='btn-inner--text'>前 往</span>
							</span>
							<span
								href=''
								className='btn btn-neutral btn-icon d-none d-lg-inline-block'
								target='_blank'
							>
								其 它
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
