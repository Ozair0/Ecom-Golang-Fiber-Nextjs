package util

import "strconv"

func ParseFloat32(s string) float32 {
	result, _ := strconv.ParseFloat(s, 32)
	return float32(result)
}

func ParseFloat64(s string) float64 {
	result, _ := strconv.ParseFloat(s, 64)
	return result
}

func ParseInt(s string) int {
	result, _ := strconv.ParseInt(s, 32, 32)
	return int(result)
}
