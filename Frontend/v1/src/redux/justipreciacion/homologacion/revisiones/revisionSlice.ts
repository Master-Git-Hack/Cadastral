import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RevisionState } from './types';
import * as actions from './actions';

const initialState: RevisionState = {
  revision_data: null,
  revision_history: [],
  revision_suggestions: [],
  revision_permissions: [],
  revision_checklist: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const revisionSlice = createSlice({
  name: 'revisiones',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetRevisionState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Fetch Revision Data
    builder
      .addCase(actions.fetchRevisionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.fetchRevisionData.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_data = action.payload;
      })
      .addCase(actions.fetchRevisionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Create Revision
    builder
      .addCase(actions.createRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.createRevision.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_data = action.payload;
      })
      .addCase(actions.createRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Update Revision
    builder
      .addCase(actions.updateRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.updateRevision.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_data = action.payload;
      })
      .addCase(actions.updateRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Fetch Revision History
    builder
      .addCase(actions.fetchRevisionHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchRevisionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_history = action.payload;
      })
      .addCase(actions.fetchRevisionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Fetch Revision Suggestions
    builder
      .addCase(actions.fetchRevisionSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchRevisionSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_suggestions = action.payload;
      })
      .addCase(actions.fetchRevisionSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Create Suggestion
    builder
      .addCase(actions.createSuggestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.createSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_suggestions.push(action.payload);
      })
      .addCase(actions.createSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Fetch Revision Permissions
    builder
      .addCase(actions.fetchRevisionPermissions.fulfilled, (state, action) => {
        state.revision_permissions = action.payload;
      })

    // Fetch Revision Checklist
    builder
      .addCase(actions.fetchRevisionChecklist.fulfilled, (state, action) => {
        state.revision_checklist = action.payload;
      })

    // Convert Suggestion
    builder
      .addCase(actions.convertSuggestion.fulfilled, (state, action) => {
        const index = state.revision_suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.revision_suggestions[index] = action.payload;
        }
      })

    // Init Revision Module
    builder
      .addCase(actions.initRevisionModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.initRevisionModule.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.revision) {
          state.revision_data = action.payload.revision;
        }
        if (action.payload.revisions) {
          // Si hay múltiples revisiones, tomar la primera como principal
          state.revision_data = action.payload.revisions[0] || null;
        }
      })
      .addCase(actions.initRevisionModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Fetch Revisions by Homologacion
    builder
      .addCase(actions.fetchRevisionsByHomologacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.fetchRevisionsByHomologacion.fulfilled, (state, action) => {
        state.loading = false;
        // Si hay revisiones, tomar la primera como principal
        state.revision_data = action.payload.revisions?.[0] || null;
      })
      .addCase(actions.fetchRevisionsByHomologacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Create Revision from Homologacion
    builder
      .addCase(actions.createRevisionFromHomologacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.createRevisionFromHomologacion.fulfilled, (state, action) => {
        state.loading = false;
        state.revision_data = action.payload.revision;
      })
      .addCase(actions.createRevisionFromHomologacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Create Revision Permission
    builder
      .addCase(actions.createRevisionPermission.fulfilled, (state, action) => {
        state.revision_permissions.push(action.payload.permission);
      })

    // Update Revision Permission  
    builder
      .addCase(actions.updateRevisionPermission.fulfilled, (state, action) => {
        const index = state.revision_permissions.findIndex(p => p.id === action.payload.permission.id);
        if (index !== -1) {
          state.revision_permissions[index] = action.payload.permission;
        }
      })

    // Delete Revision Permission
    builder
      .addCase(actions.deleteRevisionPermission.fulfilled, (state, action) => {
        state.revision_permissions = state.revision_permissions.filter(p => p.id !== action.meta.arg);
      });
  },
});

export const { clearError, setCurrentPage, resetRevisionState } = revisionSlice.actions;
export default revisionSlice.reducer;