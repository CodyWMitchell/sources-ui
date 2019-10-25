import { ADD_NOTIFICATION } from '@redhat-cloud-services/frontend-components-notifications';
import {
    ACTION_TYPES,
    SORT_ENTITIES,
    PAGE_AND_SIZE,
    FILTER_PROVIDERS,
    SET_FILTER_COLUMN,
    SOURCE_FOR_EDIT_LOADED,
    SOURCE_EDIT_REQUEST,
    ADD_APP_TO_SOURCE
} from '../action-types-providers';
import {
    doLoadAppTypes,
    doLoadSourceForEdit,
    doRemoveSource,
    doUpdateSource,
    doLoadEntities,
    doDeleteApplication
} from '../../api/entities';
import { doLoadSourceTypes } from '../../api/source_types';

export const loadEntities = (options) => (dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_ENTITIES_PENDING });

    return doLoadEntities().then(({ sources }) => {
        dispatch({
            type: ACTION_TYPES.LOAD_ENTITIES_FULFILLED,
            payload: sources,
            ...options
        });
    }).catch(error => dispatch({
        type: ACTION_TYPES.LOAD_ENTITIES_REJECTED,
        payload: { error: { detail: error.detail || error.data, title: 'Fetching data failed, try refresh page' } }
    }));
};

export const loadSourceTypes = () => (dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_SOURCE_TYPES_PENDING });

    return doLoadSourceTypes().then(sourceTypes => dispatch({
        type: ACTION_TYPES.LOAD_SOURCE_TYPES_FULFILLED,
        payload: sourceTypes
    }));
};

export const loadAppTypes = () => (dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_APP_TYPES_PENDING });

    return doLoadAppTypes().then(appTypes => dispatch({
        type: ACTION_TYPES.LOAD_APP_TYPES_FULFILLED,
        payload: appTypes.data
    }));
};

export const sortEntities = (column, direction) => ({
    type: SORT_ENTITIES,
    payload: { column, direction }
});

export const pageAndSize = (page, size) => ({
    type: PAGE_AND_SIZE,
    payload: { page, size }
});

export const filterProviders = (value) => ({
    type: FILTER_PROVIDERS,
    payload: { value }
});

export const setProviderFilterColumn = (column) => ({
    type: SET_FILTER_COLUMN,
    payload: { column }
});

export const updateSource = (source, formData, title, description) => (dispatch) =>
    doUpdateSource(source, formData).then(_finished => dispatch({
        type: ADD_NOTIFICATION,
        payload: {
            variant: 'success',
            title,
            description
        }
    })).catch(error => dispatch({
        type: 'FOOBAR_REJECTED',
        payload: error
    }));

export const removeSource = (sourceId, title) => ({
    type: ACTION_TYPES.REMOVE_SOURCE,
    payload: () => doRemoveSource(sourceId),
    meta: {
        sourceId,
        notifications: {
            fulfilled: {
                variant: 'success',
                title,
                dismissable: false
            }
        }
    }
});

export const loadSourceForEdit = sourceId => dispatch => {
    dispatch({ type: SOURCE_EDIT_REQUEST });

    return doLoadSourceForEdit(sourceId).then(sourceData => dispatch({
        type: SOURCE_FOR_EDIT_LOADED,
        payload: sourceData
    })).catch(error => dispatch({
        type: 'FOOBAR_REJECTED',
        payload: error
    }));
};

export const addMessage = (title, variant, description) => (dispatch) => dispatch({
    type: ADD_NOTIFICATION,
    payload: {
        title,
        variant,
        description,
        dismissable: true
    }
});

export const removeApplication = (appId, sourceId, successTitle, errorTitle) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.REMOVE_APPLICATION,
        payload: () => doDeleteApplication(appId, errorTitle),
        meta: {
            appId,
            sourceId,
            notifications: {
                fulfilled: {
                    variant: 'success',
                    title: successTitle,
                    dismissable: false
                }
            }
        }
    });
};

export const addAppToSource = (sourceId, app) => ({
    type: ADD_APP_TO_SOURCE,
    payload: {
        sourceId,
        app
    }
});
