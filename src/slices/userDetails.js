import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creating async thunk action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://66a3491244aa63704580a49c.mockapi.io/crudredux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const res = await response.json();
      return res;
    } catch (err) {
      return rejectWithValue(err.message ? err.message : "An unknown error occurred");
    }
  }
);

// Reading data
export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://66a3491244aa63704580a49c.mockapi.io/crudredux");

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    return rejectWithValue(e.message ? e.message : "An unknown error occurred");
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://66a3491244aa63704580a49c.mockapi.io/crudredux/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    return rejectWithValue(e.message ? e.message : "An unknown error occurred");
  }
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://66a3491244aa63704580a49c.mockapi.io/crudredux/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message ? error.message : "An unknown error occurred");
    }
  }
);

export const userDetails = createSlice({
  name: "userDetail",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handling createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling showUser
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (id) {
          state.user = state.user.filter((ele) => ele.id !== id);
        }
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetails.reducer;
