package conv

import (
	"errors"
	"strconv"
)

func StringToInt64(v string) (int64, error) {
	if v == "" {
		return 0, errors.New("value cannot be empty")
	}
	return strconv.ParseInt(v, 10, 64)
}
