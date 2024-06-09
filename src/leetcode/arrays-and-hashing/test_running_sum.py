import pytest

# https://leetcode.com/problems/running-sum-of-1d-array/description/

# 1 <= nums.length
# num can be negative

# Best Computational Runtime:
# runtime (n): need to sum each element
# space (1) if not counting output

# Solutions:

# brute
# runtime (n^2)
# space (1) if not counting output

# prefix sum not modifying input
# runtime (n): calculate prefix
# space (n): count output as it's used to create output

# prefix sum modify input
# runtime (n): calculate prefix
# space (1): reuse input

# recursion?


test_cases = [
    ([1, 2, 3, 4], [1, 3, 6, 10]),
    ([1, 1, 1, 1, 1], [1, 2, 3, 4, 5]),
    ([3, 1, 2, 10, 1], [3, 4, 6, 16, 17]),
    ([1, -1], [1, 0]),
    ([1], [1]),
    ([], []),
]


def max_running_sum_pure(nums: list[int]) -> list[int]:
    if len(nums) == 0:
        return []

    prefix_sums = [nums[0]]

    for i in range(1, len(nums)):
        prefix_sums.append(prefix_sums[-1] + nums[i])

    return prefix_sums


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_max_running_sum_pure(input, expected) -> None:
    assert max_running_sum_pure(input) == expected


def max_running_sum_mutate_input(nums: list[int]) -> list[int]:
    for i in range(1, len(nums)):
        nums[i] += nums[i - 1]

    return nums


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_max_running_sum_mutate_input(input, expected) -> None:
    assert max_running_sum_mutate_input(input) == expected
