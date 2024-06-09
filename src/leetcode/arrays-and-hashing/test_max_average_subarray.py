import pytest

# https://leetcode.com/problems/maximum-average-subarray-i/description/

# Assumptions:
# 1 <= k <= n
# nums[i] can be negative

# Best Computational Runtime:
# runtime (n): need to sum each element
# space (1)

# Solutions:

# sliding window
# runtime (n): slide across in constant steps
# space (1)


def max_average_subarray(input_array: list[int], k: int) -> float:
    window_sum = 0

    for i in range(k):
        window_sum += input_array[i]

    max_sum = window_sum

    for i in range(k, len(input_array)):
        window_sum += input_array[i]
        window_sum -= input_array[i - k]
        max_sum = max(window_sum, max_sum)

    return max_sum / k


@pytest.mark.parametrize(
    "input,k,expected",
    [
        ([1, 12, -5, -6, 50, 3], 4, 12.75),
        ([5], 1, 5),
        ([4, 0, 4, 3, 3], 5, 2.8),
        ([0, 1, 1, 3, 3], 4, 2),
        ([0, -1, -2], 3, -1),
    ],
)
def test_max_average_subarray(input, k, expected) -> None:
    assert max_average_subarray(input, k) == expected
