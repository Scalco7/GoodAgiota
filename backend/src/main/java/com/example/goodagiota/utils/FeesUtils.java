package com.example.goodagiota.utils;

public class FeesUtils {
    private FeesUtils() {}

    public static double calcCompoundFee(double value, double fee, long months) {
        double taxa = fee / 100.0;
        return value * Math.pow((1 + taxa), months);
    }
}
