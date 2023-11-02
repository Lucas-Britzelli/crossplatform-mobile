import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../../firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const firebaseBaseQuery = async ({ baseUrl, url, method, body}) => {
    switch (method) {
        case 'GET':
            const querySnapshot = await getDocs(collection(db, url));
            const data = querySnapshot.docs.map(doc => doc.data());
            return { data };
        case 'POST':
            const docRef = await addDoc(collection(db, url), body);
            return { data: { id: docRef.id, ...body } };
        default:
            throw new Error(`Unhandled method ${method}`)
    }
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: firebaseBaseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: ({ user }) => ({
                baseUrl: '',
                url: 'users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        getUsers: builder.query({
            query: () => ({
                baseUrl: '',
                url: 'users',
                method: 'GET',
                body: ''
            }),
            providesTags: ['Users']
        }),
    })
})

export const { useCreateUserMutation, useGetUsersQuery } = usersApi;
