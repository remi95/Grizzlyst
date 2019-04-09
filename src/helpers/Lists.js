import ListState from "../constants/list";
import colors from "../constants/colors";
import NavigationService from "../services/NavigationService";

/**
 * Class Lists containing methods for lists managing.
 */
class Lists {

    /**
     * Get icon depending on the list state.
     *
     * @param list
     */
    getIcon = (list) => {
        switch (list.state) {
            case ListState.EDITION:
                return 'edit';
            case ListState.IN_PROGRESS:
                return 'shopping-cart';
            case ListState.TERMINATED:
                return 'check-circle';
            default:
                return 'edit';
        }
    };

    /**
     * Get Icon color depending on list state.
     *
     * @param list
     */
    getIconColor = (list) => {
        switch (list.state) {
            case ListState.EDITION:
                return colors.BLUE;
            case ListState.IN_PROGRESS:
                return colors.DARK_GREEN;
            case ListState.TERMINATED:
                return colors.RED;
            default:
                return colors.GRAY;
        }
    };

    /**
     * Navigate to the good screen, depending on list state.
     *
     * @param list
     */
    navigateToList = (list) => {
        switch (list.state) {
            case ListState.EDITION:
                return NavigationService.navigate('EditList', { listId: list.id });
            case ListState.IN_PROGRESS:
                return NavigationService.navigate('ListInProgress', { listId: list.id });
            case ListState.TERMINATED:
                return null;
            default:
                return null;
        }
    }
}

const ListsHelper = new Lists();

export default ListsHelper;