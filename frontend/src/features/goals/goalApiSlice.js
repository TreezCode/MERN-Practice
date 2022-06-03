import { apiSlice } from '../../app/api/apiSlice';

export const goalApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Goal'],
  endpoints: (builder) => ({
    setGoal: builder.mutation({
      query: (goalData) => ({
        url: '/api/goals',
        method: 'POST',
        body: { ...goalData },
      }),
      invalidatesTags: ['Goal'],
    }),
    updateGoal: builder.mutation({
      query: (goalData, id) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: { ...goalData },
      }),
      invalidatesTags: ['Goal'],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({
        url: `/api/goals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goal'],
    }),
    getGoals: builder.query({
      query: () => '/api/goals',
      keepUnusedDataFor: 5,
      providesTags: ['Goal'],
    }),
  }),
});

export const {
  useSetGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalsQuery,
} = goalApiSlice;
