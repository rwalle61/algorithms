import pytest

# https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum

# 1 <= nums.length
# num can be negative

# Best Computational Runtime:
# runtime (n): need to sum each element
# space (1) if not counting output

# Solutions:

# brute
# runtime (n^2 * m)
# space (1)

# brute binary search
# runtime (n log mn)
# space (1)

# prefix sum
# runtime (n): calculate prefix, track min sum
# space (1): count output as it's used to create output


test_cases = [
    ([-3, 2, -3, 4, 2], 5),
    ([1, 2], 1),  # positive means > 0
    ([1, -2, -3], 5),
    ([-1], 2),
    ([0], 1),
]


def min_start_value(nums: list[int]) -> int:
    current_sum = 0
    min_sum = 0

    for num in nums:
        current_sum += num
        min_sum = min(min_sum, current_sum)

    SUM_THRESHOLD = 1
    return SUM_THRESHOLD - min_sum


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_min_start_value(input, expected) -> None:
    assert min_start_value(input) == expected
