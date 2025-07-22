import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { createSelector } from 'reselect';

export default function MUILoader() {

    const selectAllPageLoading = createSelector(
        state => state?.dataService?.pages,
        (pages) => {
            const result = {};
            const pageNames = Object.keys(pages);
            pageNames.forEach(page => {
                const pageData = pages?.[page];

                if (pageData) {
                    result[page] = pageData?.loading;
                }
            });
            return result;
        }
    );

    const Loading = useSelector(selectAllPageLoading);

    const open = Loading?.addNewArticles?.uploadArticles
        || Loading?.freshArticles?.freshArticlesTable
        || Loading?.copyEditing?.copyEditingTable
        || Loading?.ceproof?.ceproofTable
        || Loading?.CopyEditorPortal?.articleDetails
        || Loading?.AuthorPortal?.articleDetails
        || Loading?.addUser?.AdduserDetails;

    return (
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}