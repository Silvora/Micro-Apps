/** @format */

import React from "react";
import other1 from "../../assets/img/svg/illustrations/illustration-5.svg";
import other2 from "../../assets/img/svg/illustrations/illustration-6.svg";
import other3 from "../../assets/img/svg/illustrations/illustration-7.svg";
import { Link } from "react-router-dom";
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
					{/* <svg
						width='2560px'
						height='100px'
						preserveAspectRatio='none'
						x='0px'
						y='0px'
						viewBox='0 0 2560 100'
						style={{ enableBackground: "new 0 0 2560 100" }}
						className=''
					>
						<polygon points='2560 0 2560 100 0 100'></polygon>
					</svg> */}
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
					<div className='row'>
						<div className='col-xl-4 col-sm-6 mt-n7'>
							<Link to='/app1'>
								<div className='card'>
									<div className='d-flex p-5'>
										<div>
											<span className='badge badge-warning badge-pill'>
												<span>New</span>
											</span>
										</div>
										<div className='pl-4'>
											<h5 className='lh-130'>Listen to the nature</h5>
											<p className='text-muted mb-0'>
												Design made simple with a clean and smart HTML markup.
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>

						<div className='col-xl-4 col-sm-6 mt-sm-n7'>
							<Link to='/app2'>
								<div className='card'>
									<div className='d-flex p-5'>
										<div>
											<span className='badge badge-success badge-pill'>
												<span>Tips</span>
											</span>
										</div>
										<div className='pl-4'>
											<h5 className='lh-130'>Rules not to follow</h5>
											<p className='text-muted mb-0'>
												Design made simple with a clean and smart HTML markup.
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>

						<div className='col-xl-4 col-md-12 col-sm-6 mt-xl-n7'>
							<Link to='/app3'>
								<div className='card'>
									<div className='d-flex p-5'>
										<div>
											<span className='badge badge-danger badge-pill'>
												Update
											</span>
										</div>
										<div className='pl-3'>
											<h5 className='lh-130'>Beware the water</h5>
											<p className='text-muted mb-0'>
												Design made simple with a clean and smart HTML markup.
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className='row'>
						<div className='col-xl-4 col-sm-6'>
							<div className='card'>
								<div className='d-flex p-5'>
									<div>
										<span className='badge badge-warning badge-pill'>New</span>
									</div>
									<div className='pl-4'>
										<h5 className='lh-130'>Listen to the nature</h5>
										<p className='text-muted mb-0'>
											Design made simple with a clean and smart HTML markup.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-xl-4 col-sm-6'>
							<div className='card'>
								<div className='d-flex p-5'>
									<div>
										<span className='badge badge-success badge-pill'>Tips</span>
									</div>
									<div className='pl-4'>
										<h5 className='lh-130'>Rules not to follow</h5>
										<p className='text-muted mb-0'>
											Design made simple with a clean and smart HTML markup.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-xl-4 col-md-12 col-sm-6'>
							<div className='card'>
								<div className='d-flex p-5'>
									<div>
										<span className='badge badge-danger badge-pill'>
											Update
										</span>
									</div>
									<div className='pl-3'>
										<h5 className='lh-130'>Beware the water</h5>
										<p className='text-muted mb-0'>
											Design made simple with a clean and smart HTML markup.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
