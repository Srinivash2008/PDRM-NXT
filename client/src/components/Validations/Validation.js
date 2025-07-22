import { warning } from "../Notifications/Notify_services";

// add new category validation here
const newArticleValidation = (selectedJournal,productionNotes,article,selectedPublisher) => {
    let isValid = true;

    // Check categoryName
    if (!selectedPublisher) {
        isValid = false;
        warning("You must select a publisher");
        return isValid;
    }
    if (!selectedJournal) {
        isValid = false;
        warning("You must select a jouranal");
        return isValid;
    }
    if (!article) {
        isValid = false;
        warning("You must provide a article");
        return isValid;
    }

    return isValid;
};

export {
    newArticleValidation,
};