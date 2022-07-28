import { Link } from "react-router-dom";
import Store from "../../store";
import { observer } from "mobx-react-lite";
function App1() {
    const { User } = Store()
    let route = User.MicroLogin
	return (
		<>
            <div className='row'>
						<div className='col-xl-4 col-sm-6 mt-n7'>
                        <Link to={route?"/app1":"/"}>
								<div className='card'>
									<div className='d-flex p-5' >
										<div>
											<span className='badge badge-warning badge-pill'>
												<span>App1</span>
											</span>
										</div>
										<div className='pl-4'>
											<h5 className='lh-130'>Vue</h5>
											<p className='text-muted mb-0'>
												Vue2 + element-Ui 基本后台管理应用
											</p>
										</div>
									</div>
								</div>
                                </Link>
						</div>

						<div className='col-xl-4 col-sm-6 mt-sm-n7'>
							<Link to={route?"/app2":"/"}>
								<div className='card'>
									<div className='d-flex p-5'>
										<div>
											<span className='badge badge-success badge-pill'>
												<span>App2
												</span>
											</span>
										</div>
										<div className='pl-4'>
											<h5 className='lh-130'>React</h5>
											<p className='text-muted mb-0'>
												Reacte18 + Ant-Design 基本后台管理应用
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>

						<div className='col-xl-4 col-md-12 col-sm-6 mt-xl-n7'>
							<Link to={route?"/app3":"/"}>
								<div className='card'>
									<div className='d-flex p-5'>
										<div>
											<span className='badge badge-danger badge-pill'>
												App3
											</span>
										</div>
										<div className='pl-3'>
											<h5 className='lh-130'>Vue</h5>
											<p className='text-muted mb-0'>
												Vue3 + Pinia + element-Ui 视频播放应用
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					</div>
        </>
    )
}

export default observer(App1);