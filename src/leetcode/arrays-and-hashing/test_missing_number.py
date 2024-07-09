import pytest

# https://leetcode.com/problems/missing-number

# Constraints:
# 0 <= nums[i]
# 1 <= nums.length
# nums only has 1 missing number?
# nums[i] all distinct

# Best Computational Runtime:
# runtime (n): check whole list once
# space (1): deduce missing number cleverly

# Solutions:

# brute
# runtime (n^2): check whole list for 0, then 1, then 2 ... etc
# space (1)

# pre-sort
# runtime (n log n): sort then find first missing number
# space (1) if sort in place, else (n)

# cache (set)
# runtime (n): check whole list
# space (n): store collection of n-1 numbers
# TODO or can we reuse the array?

# maths deduction
# runtime (n): check whole list
# space (1): deduce missing number

# TODO bit manipulation

test_cases = [([3, 0, 1], 2), ([0, 1], 2), ([9, 6, 4, 2, 3, 5, 7, 0, 1], 8), ([], 0)]


def missing_number_brute(nums: list[int]) -> int:
    n = len(nums) + 1
    for i in range(n):
        if i not in nums:
            return i
    return -1


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_missing_number_brute(input, expected) -> None:
    assert missing_number_brute(input) == expected


def missing_number_cache_set(nums: list[int]) -> int:
    found = set(nums)

    n = len(nums) + 1
    for i in range(n):
        if i not in found:
            return i
    return -1


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_missing_number_cache_set(input, expected) -> None:
    assert missing_number_cache_set(input) == expected


def sum_arithmetic_series(n: int) -> int:
    return n * (n + 1) // 2
    # Or in O(n) time:
    # return sum(i for i in range(n + 1))


def missing_number_maths_deduction(nums: list[int]) -> int:
    n = len(nums)

    expected_sum = sum_arithmetic_series(n)

    actual_sum = sum(nums)

    missing_number = expected_sum - actual_sum

    return missing_number


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_missing_number_maths_deduction(input, expected) -> None:
    assert missing_number_maths_deduction(input) == expected
