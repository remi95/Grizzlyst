import colors from "../constants/colors";

/**
 * Class NutrientGrade containing methods for nutrient grade managing.
 */
class NutrientGrade {

    /**
     * Return the color associate to the nutrient grade.
     *
     * @param {'A', 'B', 'C', 'D', 'E'} grade
     *   The grade of the product.
     *
     * @returns {string}
     *   The color code.
     */
    getColor = (grade) => {
        let color = colors.GRAY;

        switch (grade.toUpperCase()) {
            case 'A':
                color = colors.DARK_GREEN;
                break;
            case 'B':
                color = colors.GREEN;
                break;
            case 'C':
                color = colors.YELLOW;
                break;
            case 'D':
                color = colors.ORANGE;
                break;
            case 'E':
                color = colors.RED;
                break;
            default:
                break;
        }

        return color;
    }
}

const NutrientGradeHelper = new NutrientGrade();

export default NutrientGradeHelper;