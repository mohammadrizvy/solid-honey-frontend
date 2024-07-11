import React from 'react'

const AttendacePage = () => {
	return (
		<div className='w-full rounded-md'>
			<table className="w-full p-4">
				{/* <tr className="w-full p-4">
			<th className="text-start p-4"></th>
			<th></th>
			<th className="text-right p-4 border-1"><a className="bg-red-800 p-2 text-white border-black" href="#">&#164; কর্মীর হাজিরা তালিকা</a></th>
		</tr> */}
			</table>

			<hr />

			<div className="max-w-full mx-auto">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<div className="p-4">
						<div className="relative mt-1">
							<h2 className="text-xl ">তারিখ :  <input type="date" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 mt-1text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
							</h2>

						</div>
					</div>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
						<thead className="text-black bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" class="px-6 py-3">
									কর্মী আইডি #
								</th>
								<th scope="col" className="px-6 py-3">
									কর্মীর হাজিরা
								</th>
								<th scope="col" className="px-6 py-3">
									স্ট্যাটাস
								</th>
								<th scope="col" className="px-6 py-3">
									ইন
								</th>
								<th scope="col" className="px-6 py-3">
									আউট
								</th>
							</tr>
						</thead>

						<tbody>

							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
									<div className="flex border rounded bg-gray-300 items-center p-2 ">
										<input type="number" className="bg-gray-300 w-full max-w-full focus:outline-none text-gray-700" />
									</div>
								</th>
								<td className="px-6 py-4">
									<div className="flex border rounded bg-gray-300 items-center p-2 ">
										<input type="text" className="bg-gray-300 w-full max-w-full focus:outline-none text-black" placeholder="Enter Name" />
									</div>
								</td>
								<td className="">
									<div className="flex border rounded bg-gray-300 items-center p-2 ">
										<select className="bg-gray-300 w-full max-w-full focus:outline-none text-gray-700" name="" id="">
											<option value=""></option>
										</select>
									</div>

								</td>
								<td className="px-6 py-4">
									<div className="flex border rounded bg-gray-300 items-center p-2 ">
										<input type="time" className="bg-gray-300 w-full max-w-full focus:outline-none text-gray-700" />
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex border rounded bg-gray-300 items-center p-2 ">
										<input type="time" className="bg-gray-300 w-full max-w-full focus:outline-none text-gray-700" />
									</div>
								</td>

							</tr>
						</tbody>
						<div className="mt-4">
							<button type="submit"
								className="middle none center mr-4 rounded-lg bg-red-800 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								data-ripple-light="true"
							>
								সেভ
							</button>
							<button type="reset"
								className="middle none center mr-4 rounded-lg bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								data-ripple-light="true"
							>
								রিসেট
							</button>
						</div>
					</table>
				</div>
			</div>


		</div>
	)
}

export default AttendacePage
