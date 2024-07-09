import pytest

# https://leetcode.com/problems/counting-elements

# Given an integer array arr, count how many elements x there are, such that x +
# 1 is also in arr. If there are duplicates in arr, count them separately.


# Constraints:
# 1 <= arr.length <= 1000
# 0 <= arr[i] <= 1000

# Best Computational Runtime:
# runtime (n): check whole list
# space (n): ?

# Solutions:

# brute
# runtime (n^2): for each element, check x + 1 in arr
# space (1)

# cache (set)
# runtime (n): store elements in set, then for each element check x + 1 in set (in O(1) time)
# space (n): store number of unique numbers (which is <=1000, so could say this is O(1))

# cache (array)
# runtime (n): store elements in array, then for each element check x + 1 in set (in O(1) time)
# space (n): store 0 .. max element (which is <=1000, so could say this is O(1))

# pre-sort
# runtime (n log n): sort arr then sliding window across to add counts
# space (n or 1): depending on sort algorithm.


test_cases = [
    # acceptance
    ([1, 2, 3], 2),
    ([1, 1, 3, 3, 5, 5, 7, 7], 0),
    # min arr length
    ([1], 0),
    # min arr value
    ([0, 1], 1),
    # duplicates
    ([1, 1, 2], 2),
    ([1, 2, 2], 1),
]


def count_elements_brute(arr: list[int]) -> int:
    count = 0

    for x in arr:
        if x + 1 in arr:
            count += 1

    return count


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_count_elements_brute(input, expected) -> None:
    assert count_elements_brute(input) == expected


def count_elements_cache_array(arr: list[int]) -> int:
    total_count = 0

    max_element = max(arr)

    cache = [0] * (1 + max_element)

    for x in arr:
        cache[x] += 1

    for x in range(max_element):
        x_count = cache[x]
        if cache[x + 1]:
            total_count += x_count

    return total_count


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_count_elements_cache_array(input, expected) -> None:
    assert count_elements_cache_array(input) == expected


def count_elements_presort(arr: list[int]) -> int:
    arr.sort()

    total_count = 0
    x_count = 0

    for i in range(len(arr)):
        num = arr[i]
        x = arr[i - 1]

        if num > x:
            if num == x + 1:
                total_count += x_count
            x_count = 0
        x_count += 1

    return total_count


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_count_elements_presort(input, expected) -> None:
    assert count_elements_presort(input) == expected
