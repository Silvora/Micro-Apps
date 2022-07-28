/** @format */

import React from "react";
import other1 from "../../assets/img/svg/illustrations/illustration-5.svg";
import other2 from "../../assets/img/svg/illustrations/illustration-6.svg";
import other3 from "../../assets/img/svg/illustrations/illustration-7.svg";
import App1 from "../Micro/app1"
export default function Container() {
	return (
		<>
			<section className='slice slice-lg pt-lg-6 pb-0 pb-lg-6 bg-section-secondary'>
				<div className='container'>
					<div className='row mb-5 justify-content-center text-center'>
						<div className='col-lg-6'>
							<h2 className=' mt-4'>其 它 网 站</h2>
							<div className='mt-2'>
								<p className='lead lh-180'>Other sites</p>
							</div>
						</div>
					</div>
					<div className='row mt-5'>
						<div className='col-md-4'>
							<div className='card'>
								<div className='card-body pb-5'>
									<div className='pt-4 pb-5'>
										<img
											src={other1}
											className='img-fluid img-center'
											style={{ height: "150px" }}
											alt='Illustration'
										/>
									</div>
									<h5 className='h4 lh-130 mb-3'>Unleash you creativity</h5>
									<p className='text-muted mb-0'>
										Quick Website UI Kit (FREE) contains components and pages
										that are easy to customize and change.
									</p>
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='card'>
								<div className='card-body pb-5'>
									<div className='pt-4 pb-5'>
										<img
											src={other2}
											className='img-fluid img-center'
											style={{ height: "150px" }}
											alt='Illustration'
										/>
									</div>
									<h5 className='h4 lh-130 mb-3'>Get more results</h5>
									<p className='text-muted mb-0'>
										Quick Website UI Kit (FREE) contains components and pages
										that are easy to customize and change.
									</p>
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='card'>
								<div className='card-body pb-5'>
									<div className='pt-4 pb-5'>
										<img
											src={other3}
											className='img-fluid img-center'
											style={{ height: "150px" }}
											alt='Illustration'
										/>
									</div>
									<h5 className='h4 lh-130 mb-3'>Increase your audience</h5>
									<p className='text-muted mb-0'>
										Quick Website UI Kit (FREE) contains components and pages
										that are easy to customize and change.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='slice slice-lg bg-section-dark pt-5 pt-lg-8'>
				<div className='shape-container shape-line shape-position-top shape-orientation-inverse'>
				</div>
				<div className='container position-relative zindex-100'>
					<div className='col'>
						<div className='row justify-content-center'>
							<div className='col-md-10 text-center'>
								<div className='mt-4 mb-6'>
									<h2 className='h1 text-white'>其 它 应 用</h2>
									<h4 className='text-white mt-3'>Other applications</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='slice pt-0'>
				<div className='container position-relative zindex-100'>
					<App1></App1>
				</div>
			</section>
		</>
	);
}
