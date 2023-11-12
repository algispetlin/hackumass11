import * as React from 'react';

export var COLORS = {
    primary: "hsl(210, 29%, 29%)",
    secondary: "hsl(210, 15%, 43%)",
    tertiary: "hsl(210, 12%, 86%)"
};

export default function changeTheme (hue: number, saturation: number) {
    COLORS.primary = "hsl(150, 29%, 29%)";
    COLORS.secondary = "hsl(150, 15%, 43%)";
    COLORS.tertiary = "hsl(150, 12%, 86%)";
    //COLORS.primary = "hsl({hue}, {saturation}}%, 30%)";
    //COLORS.secondary = "hsl({hue}, {saturation}%, 50%)";
    //COLORS.tertiary = "hsl({hue}, {saturation}%, 70%)";
}