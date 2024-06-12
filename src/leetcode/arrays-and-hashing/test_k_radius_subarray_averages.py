import pytest

# https://leetcode.com/problems/k-radius-subarray-averages

# 0 <= nums.length

# Best Computational Runtime:
# runtime (n): need to sum each element to calculate average
# space (1): if don't count output

# Solutions:

# brute

# fixed length sliding window
# runtime (n):
# space (1): as not using output to calculate sum

# prefix sum
# runtime (n):
# space (n): don't see how to reuse input


def get_test_cases():
    return [
        ([7, 4, 3, 9, 1, 8, 5, 2, 6], 3, [-1, -1, -1, 5, 4, 4, -1, -1, -1]),
        ([-7, -4, -3, -9, -1, -8, -5, -2, -6], 3, [-1, -1, -1, -6, -5, -5, -1, -1, -1]),
        ([100000], 0, [100000]),
        ([8], 100000, [-1]),
        ([0], 0, [0]),
        ([1], 0, [1]),
        ([], 1, []),
        (
            [40527, 53696, 10730, 66491, 62141, 83909, 78635, 18560],
            2,
            [-1, -1, 46717, 55393, 60381, 61947, -1, -1],
        ),
    ]


def k_radius_subarray_avgs_sliding_window(nums: list[int], k: int) -> list[int]:
    input_nums = nums

    if k == 0:
        return input_nums

    NO_AVERAGE = -1
    input_length = len(input_nums)
    output_averages = [NO_AVERAGE] * input_length
    window_size = 2 * k + 1

    if input_length < window_size:
        return output_averages

    left = 0
    right = 0
    window_sum = input_nums[right]

    for _ in range(1, window_size):
        right += 1
        window_sum += input_nums[right]

    centre = left + k
    output_averages[centre] = window_sum // window_size

    while right < (input_length - 1):
        window_sum -= input_nums[left]
        # TODO replace left and right with centre + k, -k
        left += 1
        right += 1
        centre += 1
        window_sum += input_nums[right]
        output_averages[centre] = window_sum // window_size

    return output_averages


@pytest.mark.parametrize(
    "input,k,expected",
    get_test_cases(),
)
def test_k_radius_subarray_avgs_sliding_window(input, k, expected) -> None:
    assert k_radius_subarray_avgs_sliding_window(input, k) == expected


def k_radius_subarray_avgs_prefix_sum(nums: list[int], k: int) -> list[int]:
    input_length = len(nums)

    if input_length == 0:
        return []

    NO_AVERAGE = -1
    averages = [NO_AVERAGE] * input_length
    window_size = 2 * k + 1

    prefix_sums = [0] * (input_length + 1)
    for i in range(input_length):
        prefix_sums[i + 1] = prefix_sums[i] + nums[i]

    for i in range(k, input_length - k):
        left_bound = i - k
        right_bound = i + k
        window_sum = prefix_sums[right_bound + 1] - prefix_sums[left_bound]
        averages[i] = window_sum // window_size

    return averages


@pytest.mark.parametrize(
    "input,k,expected",
    get_test_cases(),
)
def test_k_radius_subarray_avgs_prefix_sum(input, k, expected) -> None:
    assert k_radius_subarray_avgs_prefix_sum(input, k) == expected
