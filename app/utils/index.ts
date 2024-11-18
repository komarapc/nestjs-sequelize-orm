export const excludeObjectFields = <T>(obj: T, fields: Array<keyof T>) => {
	const newObj = { ...obj };
	fields.forEach((field) => {
		delete newObj[field];
	});
	return newObj;
};

type QueryPagination = { page: number; limit: number };
type MetaPagination = {
	current_page: number | null;
	next_page: number | null;
	prev_page: number | null;
	total: number;
	total_page: number;
};
export const metaPagination = (query: QueryPagination, total: number) => {
	const totalPage = Math.ceil(total / query.limit);
	const currentPage = query.page > totalPage ? totalPage : query.page;
	const nextPage = currentPage + 1 > totalPage ? null : currentPage + 1;
	const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
	const pagination: MetaPagination = {
		total,
		total_page: totalPage,
		current_page: currentPage,
		next_page: nextPage,
		prev_page: prevPage,
	};
	return pagination;
};
