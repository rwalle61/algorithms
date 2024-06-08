# Assumptions:
# 0 <= input_array.length

# Best Computational Runtime:
# runtime (n): need to move each element
# space (1)

# Solutions:

# 2 pointers
# runtime (n): pointers at each end, swap on each step towards middle
# space (1)


def reverse_string(input_array: list[str]) -> list[str]:
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


def test_reverse_string() -> None:
    assert reverse_string([]) == []
    assert reverse_string(["h"]) == ["h"]
    assert reverse_string(["h", "e", "l", "l", "o"]) == ["o", "l", "l", "e", "h"]
    assert reverse_string(["H", "a", "n", "n", "a", "h"]) == [
        "h",
        "a",
        "n",
        "n",
        "a",
        "H",
    ]
