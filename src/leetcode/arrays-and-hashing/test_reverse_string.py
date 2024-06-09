import pytest

# https://leetcode.com/problems/reverse-string/description/

# Assumptions:
# 0 <= input_array.length

# Best Computational Runtime:
# runtime (n): need to move each element
# space (1)

# Solutions:

# recursion
# runtime (n): move pointers outside-in, swapping
# space (n): recursive stack

# 2 pointers
# runtime (n): move pointers outside-in, swapping
# space (1)


def reverse_string_2_pointers(input_array: list[str]) -> list[str]:
    output_array = input_array.copy()  # don't count this space, just using to output
    left = 0
    right = len(output_array) - 1

    while left < right:
        tmp_right = output_array[right]
        output_array[right] = output_array[left]
        output_array[left] = tmp_right
        left += 1
        right -= 1

    return output_array


@pytest.mark.parametrize(
    "input,expected",
    [
        ([], []),
        (["h"], ["h"]),
        (["h", "e", "l", "l", "o"], ["o", "l", "l", "e", "h"]),
        (["H", "a", "n", "n", "a", "h"], ["h", "a", "n", "n", "a", "H"]),
    ],
)
def test_reverse_string_2_pointers(input, expected) -> None:
    assert reverse_string_2_pointers(input) == expected
