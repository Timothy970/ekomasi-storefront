import { createAppSlice } from "@/lib/createAppSlice";
import { getBlog, getBlogs } from "./blogAPI";
import { Content, Pagination } from "../features/types";

interface BlogSliceState {
	blog: Content | null;
	blogs: Content[] | null;
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	pagination: Pagination | null;
}

const initialState: BlogSliceState = {
	blog: null,
	blogs: null,
	pagination: null,
	status: "idle",
	message: "",
	success: false,
};

export const blogSlice = createAppSlice({
	name: "blog",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetStatus: create.reducer((state) => {
			state.status = "idle";
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		getBlogsAsync: create.asyncThunk(
			async (query: string) => {
				const response = await getBlogs(query)
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action?.payload?.data?.blogs) {
						state.blogs = action.payload.data.blogs;
					}
					if (action.payload?.message) {
						state.message = action.payload.message;
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.message = ""
				},
			}
		),
		getBlogAsync: create.asyncThunk(
			async (blog_id: string) => {
				const response = await getBlog(blog_id)
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code) {
						state.success = true
						state.message = action.payload?.message
						state.blog = action?.payload?.data
					} else {
						state.success = false
						state.message = action.payload?.message
						state.blogs = null
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
	}),
	selectors: {
		selectBlog: (state: BlogSliceState) => state.blog || null,
		selectBlogs: (state: BlogSliceState) => state.blogs || null,
		selectStatus: (state: BlogSliceState) => state.status,
		selectSuccess: (state: BlogSliceState) => state.success,
		selectMessage: (state: BlogSliceState) => state.message,
	},
});

// Export actions and selectors
export const { resetSuccess, resetStatus, resetMessage, getBlogsAsync, getBlogAsync } = blogSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectBlogs, selectBlog } = blogSlice.selectors;
export const blogReducer = blogSlice.reducer;