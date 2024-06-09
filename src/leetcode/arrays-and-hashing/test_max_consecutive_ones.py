from typing import Literal

import pytest

# 1 <= nums.length
# k can be 0
# k <= nums.length

# Best Computational Runtime:
# runtime (n): need to check each element. k amortises to n
# space (1)

# Solutions:

# sliding window
# runtime (n): slide across in amortised constant steps
# space (1)

# sliding window (more efficient)
# runtime (n): slide across in constant steps, never prune window (since won't be max anyway)
# space (1)


test_cases = [
    ([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6),
    ([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10),
    ([], 0, 0),
    ([0, 0], 0, 0),
]


def max_consecutive_ones_prune(nums: list[Literal[0, 1]], k: int) -> int:
    flips_available = k
    left = 0
    max_ones = 0

    for right in range(len(nums)):
        if nums[right] == 0:
            flips_available -= 1
        while flips_available < 0:
            if nums[left] == 0:
                flips_available += 1
            left += 1
        window_ones = right - left + 1
        max_ones = max(window_ones, max_ones)

    return max_ones


@pytest.mark.parametrize(
    "input,k,expected",
    test_cases,
)
def test_max_consecutive_ones_prune(input, k, expected) -> None:
    assert max_consecutive_ones_prune(input, k) == expected


def max_consecutive_ones_no_prune(nums: list[Literal[0, 1]], k: int) -> int:
    flips_available = k
    left = 0
    window_size = 0

    for right in range(len(nums)):
        if nums[right] == 0:
            flips_available -= 1
        # don't need to prune to a valid window, since we just need to track the size of the max valid window:
        # https://leetcode.com/problems/max-consecutive-ones-iii/editorial/
        if flips_available < 0:
            if nums[left] == 0:
                flips_available += 1
            left += 1
        window_size = right - left + 1

    return window_size


@pytest.mark.parametrize(
    "input,k,expected",
    test_cases,
)
def test_max_consecutive_ones_no_prune(input, k, expected) -> None:
    assert max_consecutive_ones_no_prune(input, k) == expected
