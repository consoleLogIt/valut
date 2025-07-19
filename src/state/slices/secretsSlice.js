import api from "@/services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSecrets = createAsyncThunk(
  "secrets/fetchSecrets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/v1/secret/getAll");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSecret = createAsyncThunk(
  "secrets/createSecret",
  async (secretData, { rejectWithValue }) => {
    try {
      const response = await api.post("/v1/secret/create", secretData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSecret = createAsyncThunk(
  "secrets/updateSecret",
  async (secretData, { rejectWithValue }) => {
    try {
      const response = await api.put(`/v1/secret/update/${secretData._id}`, secretData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSecret = createAsyncThunk(
  "secrets/deleteSecret",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/v1/secret/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const secretSlice = createSlice({
  name: "secrets",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecrets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecrets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
      })
      .addCase(fetchSecrets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch secrets";
      })
      .addCase(createSecret.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSecret.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(createSecret.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create secret";
      })
      .addCase(updateSecret.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSecret.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
      })
      .addCase(updateSecret.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update secret";
      })
      .addCase(deleteSecret.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSecret.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload.data._id);
      })
      .addCase(deleteSecret.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete secret";
      });
  },
});

export default secretSlice.reducer;
